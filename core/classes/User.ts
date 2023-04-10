export default class User {
    user_id: number = -1;
    first_name: string = "";
    last_name: string = "";
    email: string = "";

    // Optional
    session_token?: boolean = false;
    blocked_list?: User[] = [];
    contact_list?: User[] = [];

    constructor() { }

    setEmail(email: string) {
        this.email = email;
    }
    setUserId(id: number) {
        this.user_id = id;
    }
    setFirstName(first_name: string) {
        this.first_name = first_name;
    }
    setLastName(last_name: string) {
        this.last_name = last_name;
    }
    setTokenState(token: boolean) {
        this.session_token = token;
    }

    getUserInformation() {
        return {
            user_id: this.user_id,
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            session_token: this.session_token,
        };
    }

    // createUser(email: string, first_name: string, last_name: string) {
    //     this.email = email
    //     this.first_name = first_name
    //     this.last_name = last_name
    // }

    addContact(contact: User) {
        this.contact_list = this.contact_list?.concat(contact);
    }
    removeContact(contact: User) {
        this.contact_list = this.contact_list?.filter(
            (user) => user.user_id != contact.user_id
        );
    }
    getContactList() {
        return this.contact_list;
    }
    setContactList(contact_list: User[]) {
        this.contact_list = contact_list;
    }

    blockUser(contact: User) {
        this.blocked_list = this.blocked_list?.concat(contact);
    }
    unBlockUser(contact: User) {
        this.blocked_list = this.blocked_list?.filter(
            (user) => user.user_id != contact.user_id
        );
    }
    getBlockedList() {
        return this.blocked_list;
    }
    setBlockedList(blocked_list: User[]) {
        this.blocked_list = blocked_list;
    }

    // Utility methods
    isUserInitialised(): boolean {
        return this.user_id != -1 ? true : false;
    }
    isTokenSet() {
        return this.session_token;
    }
    removeToken() {
        this.session_token = false;
    }
}
