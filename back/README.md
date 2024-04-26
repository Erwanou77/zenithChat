# Projet Chat App

## Description

Ce projet est une application back-end de chat permettant aux utilisateurs de créer des groupes de discussion, d'envoyer des messages personnels et de discuter en temps réel.

## Installation

Avant de lancer le projet, assurez-vous de remplir le fichier `.env` avec les variables d'environnement nécessaires. Ensuite, exécutez les commandes suivantes dans votre terminal :

```bash
npm install
npm run dev

# API Routes Documentation

This documentation outlines the various API routes available in the application, their functionalities, and how to interact with them.

## Authentication

### POST /api/v1/signup
- **Description**: Registers a new user.
- **Body**:
  - `username`: User's username.
  - `email`: User's email.
  - `firstname`: User's first name.
  - `lastname`: User's last name.
  - `password`: User's password.
- **Response**: Returns the newly created user object along with a status code.

### POST /api/v1/login
- **Description**: Authenticates a user and returns a JWT token.
- **Body**:
  - `email`: User's email.
  - `password`: User's password.
- **Response**: Returns a JWT token and user details if authentication is successful.

## Chat Groups

### GET /api/v1/chatGroups
- **Authorization**: Admin only.
- **Description**: Fetches all chat groups.
- **Response**: List of all chat groups.

### GET /api/v1/chatGroups/:id
- **Authorization**: Authenticated users.
- **Description**: Fetches a specific chat group by ID.
- **Parameters**:
  - `id`: Chat group ID.
- **Response**: Chat group details.

### GET /api/v1/chatGroups/user/:id
- **Authorization**: Authenticated users.
- **Description**: Fetches chat groups associated with a specific user.
- **Parameters**:
  - `id`: User ID.
- **Response**: List of chat groups the user belongs to.

### POST /api/v1/chatGroups
- **Authorization**: Authenticated users.
- **Description**: Creates a new chat group.
- **Body**:
  - `name`: Name of the chat group.
- **Response**: Details of the created chat group.

### PUT /api/v1/chatGroups/:id
- **Authorization**: Authenticated users who are members or admins.
- **Description**: Updates a specific chat group.
- **Parameters**:
  - `id`: Chat group ID.
- **Body**:
  - `name`: New name for the chat group.
- **Response**: Updated chat group details.

### DELETE /api/v1/chatGroups/:id
- **Authorization**: Admins or the last remaining member of the chat group.
- **Description**: Deletes a specific chat group.
- **Parameters**:
  - `id`: Chat group ID.
- **Response**: Confirmation of deletion.

## Friendships

### GET /api/v1/friendships
- **Authorization**: Admin only.
- **Description**: Retrieves all friendships.
- **Response**: List of all friendships with user details populated.

### GET /api/v1/friendships/:id
- **Authorization**: Authenticated users involved in the friendship.
- **Description**: Retrieves a specific friendship by ID.
- **Parameters**:
  - `id`: Friendship ID.
- **Response**: Specific friendship details.

### GET /api/v1/friendships/requester/:requesterId
- **Authorization**: Authenticated users or admin.
- **Description**: Retrieves all friendship requests sent by a specific user.
- **Parameters**:
  - `requesterId`: ID of the user who sent requests.
- **Response**: List of all friendship requests sent by the user.

### GET /api/v1/friendships/addressee/:addresseeId
- **Authorization**: Authenticated users or admin.
- **Description**: Retrieves all friendship requests received by a specific user.
- **Parameters**:
  - `addresseeId`: ID of the user who received requests.
- **Response**: List of all friendship requests received by the user.

### POST /api/v1/friendships
- **Authorization**: Authenticated users.
- **Description**: Creates a new friendship request.
- **Body**:
  - `requesterId`: ID of the requester.
  - `addresseeId`: ID of the addressee.
  - `status`: Status of the friendship (e.g., pending, accepted).
- **Response**: Details of the newly created friendship.

### PUT /api/v1/friendships/:id
- **Authorization**: Authenticated users involved in the friendship or admin.
- **Description**: Updates a friendship's status.
- **Parameters**:
  - `id`: Friendship ID.
- **Body**:
  - Various fields depending on the information to update.
- **Response**: Updated friendship details.

### DELETE /api/v1/friendships/:id
- **Authorization**: Authenticated users involved in
