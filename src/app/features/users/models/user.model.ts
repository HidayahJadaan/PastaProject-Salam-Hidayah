// interface User{
// id?:string,
// name:string,
// email:string,
// password:string,
// type?:string,
// create_at?:Date //بكون فاضيين مش انا يلي بعبيهم optional 
// upadeeted_at?:Date
// } 
interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  type?: 'admin' | 'chef' | 'customer';
} 

export default User;