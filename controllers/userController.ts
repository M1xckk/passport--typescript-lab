import { userModel } from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
	let user = userModel.findOne(email);
	if (user) {
		if (isUserValid(user, password)) {
			return user;
		}
	}
	return null;
};
const getUserById = (id: number) => {
	let user = userModel.findById(id);
	if (user) {
		return user;
	}
	return null;
};

function isUserValid(user: any, password: string) {
	return user.password === password;
    }
    const createNewUser = (id: number, name: string) => {
	//@ts-ignore
	 return userModel.createNewUser(id, name);
    }
    
    export {
	getUserByEmailIdAndPassword,
	getUserById,
	createNewUser
    };