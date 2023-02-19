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

function isUserValid(
	user: {
		id: number;
		name: string;
		email: string;
		password: string;
	},
	password: string
) {
	if (user.password === password) {
		return true;
	} else {
		throw new Error("Invalid password");
	}
}

export { getUserByEmailIdAndPassword, getUserById };

