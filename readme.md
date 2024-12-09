# API REST de gestion des contacts (TypeScript)

## Description

Cette API permet de gérer une liste de contacts avec des fonctionnalités CRUD complètes, implémentée en TypeScript.

## Prérequis

- Node.js installé sur votre machine.

## Installation et exécution locale

1. Clonez ce dépôt :

```bash
   git clone https://github.com/GeorgesTatchum/test_creastyle.git
   cd test_creastyle

```

Installez les dépendances :

```bash
npm install
```

Compilez le code TypeScript :

```bash
npm run build
```

Lancez le serveur :

```bash
npm start
```

Ou pour le développement avec rechargement automatique :

```bash
npm run dev
```

L'API sera accessible à l'adresse : http://localhost:3001

## Routes disponibles

Méthode Endpoint Description
GET /contacts Récupérer la liste de tous les contacts
GET /contacts/:id Récupérer un contact par ID
POST /contacts Créer un nouveau contact
PUT /contacts/:id Mettre à jour un contact existant
DELETE /contacts/:id Supprimer un contact

## Tests locaux

Utilisez Postman ou cURL pour tester les routes.
Exemple avec cURL :

```bash
curl -X POST http://localhost:3001/contacts \
     -H "Content-Type: application/json" \
     -d '{"name": "John Doe", "email": "john.doe@example.com", "phone": "123456789"}'
```
