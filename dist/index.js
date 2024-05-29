"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
function wrapper(name) {
    return function logger(target) {
        return class extends target {
            constructor() {
                super(...arguments);
                this.address = "hà nội";
                this.id = 0; // ghi đè các thuộc tính đã có
                // name : string =""; // ghi đè các thuộc tính đã có
                // age : number= 0; // ghi đè các thuộc tính đã có
            }
        };
    };
}
// Method decorator 
function follow(target, propertyKey, descriptor) {
    console.log(target); // tham chiếu của hàm
    console.log(propertyKey); // tên hàm
    // console.log(descriptor.value); // bộ chỉnh sửa hàm 
    // descriptor.value = function(){
    //     console.log(`ghi đè hàm greet`);
    //     console.log(`helo bạn có id = ${this.id}`);
    // }
}
function beforeSum(target, propertyKey, descriptor) {
    let oldFun = descriptor.value; // lấy ra giá trị cũ 
    // thay thế hàm sum bằng 1 hàm khác
    descriptor.value = function (...args) {
        // log trước khi tính 
        console.log(...args);
        return oldFun(...args);
    };
}
// Property decorator 
// Accessor decorator (người giám sát, kiểm soát)
function x2(target, propertyKey) {
    console.log(target);
    console.log(propertyKey);
}
// tạo 1 hàm pow return về decorator method 
function pow(value) {
    // khia báo các biến như các thuộc tính 
    return function (target, propertyKey, descriptor) {
        let old = descriptor.value;
        descriptor.value = function (...args) {
            return Math.pow(old(...args), value);
        };
    };
}
// Decorator Factories : kĩ thuật truyền tham số cho 1 decorator thông qua khia niệm closure 
let Student = class Student {
    constructor(id, name, age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
    greet() {
        console.log(`Hello bạn ${this.name}`);
    }
    // tính tổng
    sum(a, b) {
        return a + b;
    }
    // tính lũy thừa
    luyThua(a) {
        return a;
    }
    // sử dụng từ  khóa get / set
    get id1() {
        console.log("gọi get");
        return this.id;
    }
    set id1(id) {
        console.log("gọi set");
        this.id = id;
    }
};
__decorate([
    x2
], Student.prototype, "age", void 0);
__decorate([
    follow
], Student.prototype, "greet", null);
__decorate([
    beforeSum
], Student.prototype, "sum", null);
__decorate([
    pow(3)
], Student.prototype, "luyThua", null);
Student = __decorate([
    wrapper("hung")
], Student);
let student = new Student(1, "hung", 19); // chạy trước
console.log(student);
student.greet();
console.log(student.sum(1, 2));
student.id1 = 10;
console.log(student.age);
console.log(student.luyThua(5)); // 25
// Các loại decorator :
//  Decorator Factories
