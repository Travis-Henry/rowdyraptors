#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>

const char* ssid = "espTest";
const char* password = "rowdyraptors";
const char* getApiToken = "S3N65FATzOFoob0bgr40vcBVccyKiGVLFUdw8N1M";
const char* postApiToken = "qIGBRlV8dC2TR0qgUhAMbk3h0JaTAKgkqg8rmHOQ";
const char* kintoneURL = "https://dino-hacks.kintone.com/k/v1/records.json?app=3&totalCount=true";

const int button1 = D5;  // GPIO pin for button 1
const int led1Pin = D6;
const int button2 = D7;  // GPIO pin for button 2
const int led2Pin = D8;

// Global variables to store the counts
int correctCount = 0;
int incorrectCount = 0;

WiFiClientSecure client;

String playerName; // Public string to store the user's name

void setup() {
  Serial.begin(115200);
  pinMode(button1, INPUT_PULLUP);  // Set button 1 as an input with an internal pull-up resistor
  pinMode(button2, INPUT_PULLUP);  // Set button 2 as an input with an internal pull-up resistor
  pinMode(led1Pin, OUTPUT);        // Set the LED 1 pin as an output
  pinMode(led2Pin, OUTPUT);        // Set the LED 2 pin as an output
  digitalWrite(led1Pin, LOW);      // Turn off LED 1 initially
  digitalWrite(led2Pin, LOW);      // Turn off LED 2 initially
  randomSeed(analogRead(0));

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Prompt for user's name
  Serial.println("Please enter your name:");
  while (!Serial.available()) {
    delay(10); // Wait for user input
  }
  playerName = Serial.readStringUntil('\n');
  playerName.trim(); // Remove any leading/trailing whitespace

  // Greet the user
  Serial.print("Hello, ");
  Serial.println(playerName);
}


void loop() {
  bool currentButton1State = digitalRead(button1);
  bool currentButton2State = digitalRead(button2);

  if (currentButton1State == LOW) { // POST button is activated
    digitalWrite(led1Pin, HIGH);  // Turn on the LED
    // Wait for debounce period and check if button is still pressed
    delay(50);  // Debounce delay
    if (digitalRead(button1) == LOW) {
      // Button press confirmed
      Serial.println("Button press detected. Querying five random questions...");
      fetchAndProcessRecords(5); // To process 3 records
      // Wait for the button to be released
      while (digitalRead(button1) == LOW) {
        delay(10);
      }
    }
    digitalWrite(led1Pin, LOW);  // Turn off the LED
  }
  if (currentButton2State == LOW) { // GET button is activated
    digitalWrite(led2Pin, HIGH);  // Turn on the LED
    if (digitalRead(button2) == LOW) {
      Serial.println("Button 2 pressed");
      //postRecord();
      while (digitalRead(button2) == LOW) {
        delay(10);
      }
    }
    digitalWrite(led2Pin, LOW);  // Turn off the LED
  }
  delay(10);  // Loop delay
}

void fetchAndProcessRecords(int numberOfRecords) {
  HTTPClient http;
  client.setInsecure();
  http.begin(client, kintoneURL);
  http.addHeader("X-Cybozu-API-Token", getApiToken);

  int httpCode = http.GET();

  if (httpCode == HTTP_CODE_OK) {
    String payload = http.getString();
    DynamicJsonDocument doc(40000);
    deserializeJson(doc, payload);
    JsonArray records = doc["records"];

    int totalCount = records.size();

    if (totalCount >= numberOfRecords) {
      std::vector<int> selectedIndices;
      while (selectedIndices.size() < numberOfRecords) {
        int randomIndex = random(0, totalCount);
        if (std::find(selectedIndices.begin(), selectedIndices.end(), randomIndex) == selectedIndices.end()) {
          selectedIndices.push_back(randomIndex);
        }
      }

      correctCount = 0; // Reset correct answers count
      incorrectCount = 0; // Reset incorrect answers count

      for (int index : selectedIndices) {
        printRecord(records[index]["recNum"]["value"].as<int>(), records[index]);
        Serial.println("\nEnter your answer (True or False):");
        while (!Serial.available()) {
          delay(10);
        }
        String userInput = Serial.readStringUntil('\n');
        userInput.trim();
        clearSerialBuffer();

        String correctAnswer = records[index]["Answer"]["value"].as<String>();
        correctAnswer.trim();
        if (userInput.equalsIgnoreCase(correctAnswer)) {
          Serial.println("Correct!");
          correctCount++;
        } else {
          Serial.println("Incorrect. The correct answer was: " + correctAnswer);
          incorrectCount++;
        }
        delay(500);
      }

      // Print the results
      Serial.println("\nQuiz Finished!");
      Serial.print("Correct Answers: ");
      Serial.println(correctCount);
      Serial.print("Incorrect Answers: ");
      Serial.println(incorrectCount);
    } else {
      Serial.println("Not enough records.");
    }
  } else {
    Serial.println("Error in HTTP request");
  }
  http.end();
  
  // Print the results and post them
  Serial.println("\nQuiz Finished!");
  Serial.print("Correct Answers: ");
  Serial.println(correctCount);
  Serial.print("Incorrect Answers: ");
  Serial.println(incorrectCount);

  // Post the results
  postRecord(playerName, correctCount, incorrectCount);
}


void printRecord(int recNum, JsonObject record) {
  Serial.print("Record with recNum ");
  Serial.print(recNum);
  Serial.println(":");
  Serial.print("Question: ");
  Serial.print(record["Question"]["value"].as<String>());
  //Serial.print(" Answer: ");
  //Serial.print(record["Answer"]["value"].as<String>());
}


void postRecord(const String& playerName, int correctCount, int incorrectCount) {
    HTTPClient http;
    client.setInsecure();
    http.begin(client, "https://dino-hacks.kintone.com/k/v1/record.json");

    http.addHeader("X-Cybozu-API-Token", postApiToken);
    http.addHeader("Content-Type", "application/json");

    // Create JSON payload with dynamic data
    DynamicJsonDocument jsonDoc(4096);
    jsonDoc["app"] = 4;
    jsonDoc["record"]["Name"]["value"] = playerName;
    jsonDoc["record"]["Correct"]["value"] = String(correctCount);
    jsonDoc["record"]["Incorrect"]["value"] = String(incorrectCount);

    String requestBody;
    serializeJson(jsonDoc, requestBody);

    int httpCode = http.POST(requestBody);

    if (httpCode > 0) {
        // HTTP response code
        String payload = http.getString();
        Serial.println(httpCode);
        Serial.println(payload);
    } else {
        Serial.println("Error on sending POST");
    }

    http.end();
}

void clearSerialBuffer() {
    while (Serial.available() > 0) {
        Serial.read();
    }
}

