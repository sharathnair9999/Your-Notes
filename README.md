
<div align="center">
  <img src="https://res.cloudinary.com/sharath-media-library/image/upload/v1649310087/note-app/notes_1_kxeots.png" width="150" title="App Logo">

   # [Your Notes](https://your-note-app.netlify.app/)
     A video library where you can learn to draw.
</div>

#### Stack Used

- React
- [Nothing UI](https://nothing-ui-library.netlify.app/)- Component Library
- Javascript

#### Built With -

- Context API + useReducer
- [React Router v6](https://reactrouter.com/docs/en/v6/getting-started/overview)

#### Packages Used - 
 - [MockBee](https://www.npmjs.com/package/create-mock-backend) - A mock backend for getting mock APIs to build the functional logic of the application
 - [Axios](https://www.npmjs.com/package/axios) - For making API calls
 - [React Quill](https://www.npmjs.com/package/react-quill) - For writing Note Content in a Rich Text Editor

#### How To Run in Local - 
Run these commands in your terminal
 ```
 git clone https://github.com/sharathnair9999/Your-Notes.git
 cd ./Your-Notes
 npm install
```

Add `.env` file to the root directory and place a JWT secret key in it like below and save it
`REACT_APP_JWT_SECRET = <your_secret_code>`

After that Run in your local with this command. 

`npm start`
secret_code can be anything of your choice. 
And now this application runs in your local machine too. 

# Features

- Landing Page
- Authentication: 
    - User Signup 
    - User Login
- All Notes Page
	- Add a Note
	- Update a Note
	- Delete Note
- Filter by Label Page
- Archives 
	- Add note to Archive
	- Restore note from Archive
	- Delete note from Archive
- Pin / Unpin a note
- Rich Text Editor to write the notes
- Trash Page
	- Restore from Trash
	- Delete from Trash Permanently
	- Clear Trash


# Demo
![Your Note Demo](https://res.cloudinary.com/sharath-media-library/image/upload/v1649313723/note-app/your-note-demo_1_xl9xel.gif "Your Note App Demo")
