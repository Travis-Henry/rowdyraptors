# DinoQuiz

This repository contains two main folders: leaderboard- which holds all the code for the leaderboard website and kintone-esp8266- which holds all the code for the microcontroller that interfaces with an API.
(https://www.rowdyraptors.co)

## Table of Contents

- [Introduction](#introduction)
- [Components](#components)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
  
## Introduction

An interactive true false game about dinosaurs

## Components

### 1. Leaderboard Site

The `leaderboard` folder contains the files for the leaderboard static site. This site displays all the scores from the kintone backend. The site is made using react and it is deployed on render.com

### 2. Kintone-ESP8266

The `kintone-esp8266` folder contains microcontroller code written for ESP8266 devices. This code interacts with an API, specifically designed for interfacing with Kintone, a cloud-based database management platform.

## Setup Instructions

Provide step-by-step instructions for setting up and running both components of the project.

### To Run the Learderboard site locally

1. Clone this repo
2. cd to the `leaderboard` folder.
3. run npm install
4. run npm run dev
5. enjoy the local version of the site

### Kintone-ESP8266 Setup

1. Clone this repo
1. Navigate to the `kintone-esp8266` folder.
2. Launch the Arduino IDE, select the esp8266 board and flash it

## Usage

Left button allows user to switch between true and false for anwser selection. The right button confirms the selection.
Once five quiz questions (pulled at random from the list at Kintone) have been answered, the number of correct and incorrect quiz questions along with the player name are uploaded from the esp8266 to the Kintone database.

