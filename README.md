## Proof of Concept - Generating UI and DB-connected CRUD REST API from a single schema

## Prerequisites
- Install MongoDB and make sure it's running on default port 27017.
- Also make sure you have NodeJS installed.

## How to run?
Backend:
```
cd backend
npm install
npm run start
```

Frontend:
```
cd frontend
npm install
npm run start
```

Frontend runs on [http://localhost:3000](http://localhost:3001/api/v1/AudioInputDevices)  
Backend runs on [http://localhost:3001/api/v1](http://localhost:3001/api/v1/AudioInputDevices)  
For example: GET [http://localhost:3001/api/v1/AudioInputDevices](http://localhost:3001/api/v1/AudioInputDevices)  

TODO:

- [x] Find a way to convert UI-Schema to JSON-Schema for sue with express-restify-mongoose
- [x] Generate DB-connected REST API automatically for all (array of obejcts-)schemas found in common/schemas
- [x] Generate a UI from an (object)-schema (common/schemas/Test.json)
- [ ] Generate a Table UI from an (array of objects)-schema (common/schemas/AudioInputDevices.json)
- [ ] Make the table editable or have an Add/Edit form and buttons for Add/Edit/Delete
- [ ] Make the table interact with the REST API.
- [ ] In the end there should be a simple REACT component that takes a schema name as a parameter (e.g. "AudioInputDevices") and automatically loads `common/schemas/AudioInputDevices.json` from that and connects it with the REST API. Maybe an apiBaseUrl param would make sense, which would be `http://localhost:3001/api/v1` in this case.