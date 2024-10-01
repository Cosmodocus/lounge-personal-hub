# Project Backend Setup Guide

This document outlines the steps to set up the Backend.

## Prerequisites

Ensure you have the following installed on your machine:

- Python 3.12 or later
- Virtual environment for Python

## Step 1: Setting Up the Virtual Environment

1. Navigate to the server folder:
    ```bash
    cd server
    ```

2. Create a virtual environment:
    ```bash
    python -m venv venv
    ```

3. Activate the virtual environment:
    - On macOS and Linux:
      ```bash
      source venv/bin/activate
      ```
    - On Windows:
      ```bash
      venv\Scripts\activate
      ```

## Step 2: Install Required Dependencies

Install all dependencies from `requirements.txt`:
    ```bash
    pip install -r requirements.txt
    ```

## Step 3: Open your PostgreSQL client:
1. Open your PostgreSQL client:
    ```bash
    psql -U postgres
    ```

2. Create a new user (if one doesn’t exist):
    ```sql
    CREATE USER <your_username> WITH PASSWORD '<your_password>';
    ```

3. Create a new database:
    ```sql
    CREATE DATABASE <your_database>;
    ```

4. Grant privileges to the newly created user:
    ```sql
    GRANT ALL PRIVILEGES ON DATABASE <your_database> TO <your_username>;
    ```

## Step 4: Configure Your `.env` File

Create a `.env` file in the server folder and add the following environment variables:

    ```bash
    SECRET_KEY=your_super_secret_key
    ALGORITHM=HS256
    ACCESS_TOKEN_EXPIRE_MINUTES=30
    DATABASE_URL=postgresql://<your_username>:<your_password>@localhost/<your_database>
    ```

## Step 5: Set Up Alembic (Database Migrations)

Run the Alembic migrations to set up the database tables:
    ```bash
    alembic upgrade head
    ```

## Step 6: Running the FastAPI Application

Run the application using Uvicorn:
    ```bash
    uvicorn app.main:app --reload
    ```

Open your browser and navigate to:
    ```bash
    http://127.0.0.1:8000/docs
    ```

You should see the FastAPI interactive documentation (Swagger UI).

## Step 7: Testing the APIs

1. Register a user: Use the `/register` endpoint to register a new user.
2. Log in: Use the `/login` endpoint to log in with the registered user credentials and get a JWT token.
