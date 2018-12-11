# Child's Play Therapeutic Video Game Guide

## Schema Design

**Game**

|   id  |   name    |   system  |   gender    |   description |   thumbnail  |   image |   current  |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Integer | String | System Enum | Gender Enum | String | String | String | Boolean |

**Ranking**

|   id  |   age  |   symptom    |   game_id    |   rank  |
|:-:|:-:|:-:|:-:|:-:|
| Integer | Age Enum | Symptom Enum | Integer | Integer |

**TmpFile**

|   id  |   file   |
|:------:|:-------:|
| String | LargeBinary |

**Update**

|   time  |   valid   |
|:------:|:---------:|
| String | Boolean |

## Enums

**age_types**

* 12 and Under
* 13 and Older

**gender_types**

* Male
* Female
* Both
* No Discernable Gender

**symptom_types**

* Bored (Long Term)
* Bored (Short Term)
* Pain
* Anxiety/Hyperactivity
* Sadness
* Cognitive Impairment

**system_types**

* PlayStation Vita
* Xbox One
* PlayStation 4
* Nintendo Switch
* Nintendo 3DS
* Apple iOS
* Android
* PlayStation VR
* HTC VIVE
* Oculus Rift

## Conventions
This API will follow the [H4I REST API Spec](https://github.com/hack4impact-uiuc/wiki/wiki/Our-REST-API-Specification).

All `GET` request parameters should be query parameters.

All `POST` and `PUT` request parameters should be body parameters.

## Repayment Schedule Matrix Format in Endpoints

## Endpoints Documentation 

* GET /games
* POST /games
* GET /games/<id>
* PUT /games/<id>
* GET /games/all
* GET /games/incomplete
* GET /search/games
* GET /updates

*ALL ENDPOINTS REQUIRE A `key` PARAMETER*

### Endpoint

    GET /games

**Description**

Get a json of games split by console and sorted by rank based on parameters. 

**Parameters**

|   Name    |  Type  | Required                      | Description               |
|:---------:|:------:|:-----------------------------:|:-------------------------:|
| age  | string | **Required** | See age enum 
| symptom  | string | **Required** | See symptom enum 
| system  | string | Not Required | See system enum 
| gender  | string | Not Required | See gender enum 

**Response**

    {
      success: true,
      message: '',
      result: {
        system1: [...],
        system2: [...],
        ...
      }
    }

### Endpoint

    POST /games
    
**Description**

Parses EEDAR spreadsheet and updates games and ranking in database. Old games that were in previous spreadsheets but not current are marked as old through the ranking, but stay in the database. This uses an asynchronous task and takes up to 30 minutes on a full-sized sheet.

**Parameters**

|   Name    |  Type  | Required                      | Description               |
|:---------:|:------:|:-----------------------------:|:-------------------------:|
| file  | file | **Required** | EEDAR Spreadsheet

**Response**
    
    {
      success: true,
      message: 'Database update begun.',
      result: null
    }

### Endpoint

    GET /games/<id>

**Description**

Gets a specific game by its id.

**Response**

    {
      success: true,
      message: '',
      result: {
        game: <json of game data>
      }
    }

### Endpoint

    PUT /games/<id>

**Description**

Updates game info by id.

**Parameters**

|   Name    |  Type  | Required                      | Description               |
|:---------:|:------:|:-----------------------------:|:-------------------------:|
| description  | string | Not Required | Game description
| image  | string | Not Required| Image URL 
| thumbnail  | string | Not Required | Thumbnail URL 

**Response**

    {
      success: true,
      message: 'Game successfully updated",
      result: {
        game: <json of game data>
      }
    }

### Endpoint

    GET /games/all

**Description**

Get a json of all games split by console and sorted by rank.  

**Response**

    {
      success: true,
      message: '',
      result: {
        system1: [...],
        system2: [...],
        ...
      }
    }

### Endpoint

    GET /games

**Description**

Get a json of all games split by console and sorted by rank, where game is missing information (image url or description). 

**Response**

    {
      success: true,
      message: '',
      result: {
        system1: [...],
        system2: [...],
        ...
      }
    }

### Endpoint

    GET /search/games

**Description**

Get a json of games split by console and sorted by rank where all games have parameter as substring.

**Parameters**

|   Name    |  Type  | Required                      | Description               |
|:---------:|:------:|:-----------------------------:|:-------------------------:|
| name  | string | **Required** | Partial name of game

**Response**

    {
      success: true,
      message: '',
      result: {
        system1: [...],
        system2: [...],
        ...
      }
    }

### Endpoint

    GET /updates

**Description**

Get last times for successful and unsuccessful POST request if any exist (this is necessary because the POST is asynchronous).

**Response**

    {
      success: true,
      message: '',
      result: {
        updates: {
          valid: <UTC time>,
          invalid: <UTC time>
        }
      }
    }
