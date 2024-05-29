// Tổng quan : decorator là 1 bộ trang trí cho 
// phép can thiệp vào đối tượng trong quá trình chạy (runtime)
// bản chất decorator là 1 function
// function logger(){
//     return function(target : any){
//         console.log(target);
//     }
// }
// Class decorator : Function = (constructor : any) => {  }
// nếu class decorator trả về 1 class mới thì đối tượng sẽ bị ghi đè bởi class đó 
function logger<T extends { new (...args: any[]): {} }>(target : T){
   return class extends target{ // annonymous class : lớp nặc danh
    address: string = "hà nội"; 
    id : number =0; // ghi đè các thuộc tính đã có
    // name : string =""; // ghi đè các thuộc tính đã có
    // age : number= 0; // ghi đè các thuộc tính đã có
   }
}

// Method decorator 

function follow(target:any,propertyKey: string, descriptor : PropertyDescriptor){
    console.log(target); // tham chiếu của hàm
    console.log(propertyKey); // tên hàm
    // console.log(descriptor.value); // bộ chỉnh sửa hàm 
    // descriptor.value = function(){
    //     console.log(`ghi đè hàm greet`);
    //     console.log(`helo bạn có id = ${this.id}`);
        
    // }
}
function beforeSum(target:any,propertyKey: string, descriptor : PropertyDescriptor){
    let oldFun  = descriptor.value; // lấy ra giá trị cũ 
    // thay thế hàm sum bằng 1 hàm khác
    descriptor.value = function(...args:any[]){
        // log trước khi tính 
        console.log(...args);
        return oldFun(...args)
    }
}

@logger
class Student{
    id : number;
    name : string;
    age : number;
    constructor(id : number,name:string, age:number){
        this.id = id;
        this.name = name;
        this.age = age;
    }
    @follow
    greet(){
       console.log( `Hello bạn ${this.name}`);
    }
    // tính tổng
    @beforeSum
    sum(a:number,b:number){
        return a+b;
    }
}

let student = new Student(1,"hung",19); // chạy trước
console.log(student);
student.greet();
console.log(student.sum(1,2))


// Các loại decorator :


//  Decorator Factories