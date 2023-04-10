import { UserModel } from "../core/models/UserModel";

const users: Array<UserModel> = [{
    id: 444, firstname: 'mario', lastname: 'liberato', email: 'gnmpolicemango@gmail.com', password: 'IAMANOOB'
},
{
    id: 2221, firstname: 'mario1', lastname: 'liberato', email: 'gnmpolicemango@gmail.com', password: 'IAMANOOB'
},
{
    id: 323, firstname: 'mario2', lastname: 'liberato', email: 'gnmpolicemango@gmail.com', password: 'IAMANOOB'
}]

class UserAPI implements IRequest<UserModel>{

    GetAll(): UserModel[] {
        return users;
    }

    GetById(arg: number): UserModel {
        return users.find((user) => user.id === arg) ||
            { id: -1, firstname: '', lastname: '', email: '', password: '' }
    }

    Remove(arg: number): boolean {
        let user: UserModel = this.GetById(arg);

        if (user.id !== -1) {
            users == users.filter((user) => user.id !== arg);
            return true;
        }
        else {
            return false;
        }
    }

    Add(arg: UserModel): boolean {
        users.push(arg)
        return true;
    }

    Update(arg: UserModel): boolean {
        throw new Error("Method not implemented.");
    }

}

export default UserAPI;