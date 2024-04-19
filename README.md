# async-race-api
Api for Rolling Scopes School task "Async Race".

## Setup and Running

- Use `node 14.x` or higher.
- Clone this repo: `$ git clone https://github.com/mikhama/async-race-api.git`.
- Go to downloaded folder: `$ cd async-race-api`.
- Install dependencies: `$ npm install`.
- Start server: `$ npm start`.
- Now you can send requests to the address: `http://127.0.0.1:3000`.

## Usage

- **Garage**
    - [Get Cars](https://github.com/mikhama/async-race-api#get-cars)
    - [Get Car](https://github.com/mikhama/async-race-api#get-car)
    - [Create Car](https://github.com/mikhama/async-race-api#create-car)
    - [Delete Car](https://github.com/mikhama/async-race-api#delete-car)
    - [Update Car](https://github.com/mikhama/async-race-api#update-car)
- **Engine**
    - [Start / Stop Car's Engine](https://github.com/mikhama/async-race-api#start--stop-cars-engine)
    - [Switch Car's Engine to Drive Mode](https://github.com/mikhama/async-race-api#switch-cars-engine-to-drive-mode)
- **Winners**
    - [Get Winners](https://github.com/mikhama/async-race-api#get-winners)
    - [Get Winner](https://github.com/mikhama/async-race-api#get-winner)
    - [Create Winner](https://github.com/mikhama/async-race-api#create-winner)
    - [Delete Winner](https://github.com/mikhama/async-race-api#delete-winner)
    - [Update Winner](https://github.com/mikhama/async-race-api#update-winner)

**Get Cars**
----
Returns json data about cars in a garage.

<details>

* **URL**

    /garage

* **Method:**

    `GET`

* **Headers:**

    None

*  **URL Params**

    None

* **Query Params**

    **Optional:**
 
    `_page=[integer]`
  
    `_limit=[integer]`

    If `_limit` param is passed api returns a header `X-Total-Count` that countains total number of records.

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
      [
        {
          "name": "Tesla",
          "color": "#e6e6fa",
          "id": 1
        }
      ]
    ```
    **Headers:**
    ```
      "X-Total-Count": "4"
    ```
 
* **Error Response:**

    None

* **Notes:**

    None

</details>

**Get Car**
----
Returns json data about specified car.

<details>

* **URL**

    /garage/:id

* **Method:**

    `GET`

* **Headers:**

    None

*  **URL Params**

    **Required:**
 
    `id=[integer]`

* **Query Params**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
      {
        "name": "Tesla",
        "color": "#e6e6fa",
        "id": 1
      }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
      {}
    ```

* **Notes:**

    None

</details>

**Create Car**
----
Creates a new car in a garage.

<details>

* **URL**

    /garage

* **Method:**

    `POST`

* **Headers:**

    `'Content-Type': 'application/json'`

*  **URL Params**

    None

* **Query Params**

    None

* **Data Params**

    ```typescript
      {
        name: string,
        color: string
      }
    ```

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** 
    ```json
      {
          "name": "New Red Car",
          "color": "#ff0000",
          "id": 10
      }
    ```
 
* **Error Response:**

    None

* **Notes:**

    None

</details>


**Delete Car**
----
Delete specified car from a garage

<details>

* **URL**

    /garage/:id

* **Method:**

    `DELETE`

* **Headers:**

    None

*  **URL Params**

    **Required:**
 
    `id=[integer]`

* **Query Params**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
      {}
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
      {}
    ```

* **Notes:**

    None

</details>

**Update Car**
----
Updates attributes of specified car.

<details>

* **URL**

    /garage/:id

* **Method:**

    `PUT`

* **Headers:**

    `'Content-Type': 'application/json'`

*  **URL Params**

    **Required:**

    `id=[integer]`

* **Query Params**

    None

* **Data Params**

    ```typescript
      {
        name: string,
        color: string
      }
    ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
      {
          "name": "Car with new name",
          "color": "#ff00ff",
          "id": 2
      }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
      {}
    ```

* **Notes:**

    None

</details>

**Start / Stop Car's Engine**
----
Starts or stops engine of specified car, and returns it's actual velocity and distance.

<details>

* **URL**

    /engine

* **Method:**

    `PATCH`

* **Headers:**

    None

*  **URL Params**

    None

* **Query Params**

    **Required:**
 
    `id=[integer]`
  
    `status=['started'|'stopped']`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
      {
        "velocity": 64,
        "distance": 500000
      }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
      **Content:** 

      Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"

  OR

  * **Code:** 404 NOT FOUND <br />
      **Content:** 

      Car with such id was not found in the garage.

* **Notes:**

    None

</details>

**Switch Car's Engine to Drive Mode**
----
Switches engine of specified car to drive mode and finishes with success message or fails with 500 error.

<details>

* **URL**

    /engine

* **Method:**

    `PATCH`

* **Headers:**

    None

*  **URL Params**

    None

* **Query Params**

    **Required:**
 
    `id=[integer]`
  
    `status=['drive']`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
      {
        "success": true
      }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
      **Content:** 

      Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"

  OR
  
  * **Code:** 404 NOT FOUND <br />
      **Content:** 

      Engine parameters for car with such id was not found in the garage. Have you tried to set engine status to "started" before?

  OR

  * **Code:** 429 TOO MANY REQUESTS <br />
      **Content:** 

      Drive already in progress. You can't run drive for the same car twice while it's not stopped.

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** 

      Car has been stopped suddenly. It's engine was broken down.

* **Notes:**

    - Before using this request you need to switch engine status to the 'started' status first.
    - Time when response will finish can be calculated using response from making engine 'started'.
    - Engine may fall randomly and at random time at the whole distance.

</details>

**Get Winners**
----
Returns json data about winners.

<details>

* **URL**

    /winners

* **Method:**

    `GET`

* **Headers:**

    None

*  **URL Params**

    None

* **Query Params**

    **Optional:**
 
    `_page=[integer]`
  
    `_limit=[integer]`

    `_sort=['id'|'wins'|'time']`

    `_order=['ASC'|'DESC']`

    If `_limit` param is passed api returns a header `X-Total-Count` that countains total number of records.

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
      [
        {
          "id": 16,
          "wins": 1,
          "time": 2.92
        }
      ]
    ```
    **Headers:**
    ```
      "X-Total-Count": "4"
    ```
 
* **Error Response:**

    None

* **Notes:**

    None

</details>

**Get Winner**
----
Returns json data about the specified winner.

<details>

* **URL**

    /winners/:id

* **Method:**

    `GET`

* **Headers:**

    None

*  **URL Params**

    **Required:**
 
    `id=[integer]`

* **Query Params**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
      {
          "id": 1,
          "wins": 1,
          "time": 10
      }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
      {}
    ```

* **Notes:**

    None

</details>

**Create Winner**
----
Creates a new records in the winners table.

<details>

* **URL**

    /winners

* **Method:**

    `POST`

* **Headers:**

    `'Content-Type': 'application/json'`

*  **URL Params**

    None

* **Query Params**

    None

* **Data Params**

    ```typescript
      {
        id: number,
        wins: number,
        time: number
      }
    ```

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** 
    ```json
      {
        "id": 109,
        "wins": 1,
        "time": 10
      }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** 

      Error: Insert failed, duplicate id

* **Notes:**

    None

</details>

**Delete Winner**
----
Delete the specified car from the winners table.

<details>

* **URL**

    /winners/:id

* **Method:**

    `DELETE`

* **Headers:**

    None

*  **URL Params**

    **Required:**
 
    `id=[integer]`

* **Query Params**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
      {}
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
      {}
    ```

* **Notes:**

    None

</details>

**Update Winner**
----
Updates attributes of the specified winner.

<details>

* **URL**

    /winners/:id

* **Method:**

    `PUT`

* **Headers:**

    `'Content-Type': 'application/json'`

*  **URL Params**

    **Required:**

    `id=[integer]`

* **Query Params**

    None

* **Data Params**

    ```typescript
      {
        wins: number,
        time: number
      }
    ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```json
      {
        "wins": 2,
        "time": 11,
        "id": 16
      }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
      {}
    ```

* **Notes:**

    None

</details>
