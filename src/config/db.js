import { db } from './firebase';

// User API
export const doCreateUser = (userId, name, email) =>
    db.ref(`users/` + userId).set({
        username: name,
        email: email,        
    });

export const doGetUser = (userId) =>
    db.ref('/users/' + userId).once('value');
