interface IRequest<Type> {

    GetAll(): Array<Type>;
    GetById(arg: number): Type;
    Remove(arg: number): boolean;
    Add(arg: Type): boolean;
    Update(arg: Type): boolean;

}