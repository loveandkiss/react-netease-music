interface IDictionary<T> {
  [key: string]: T
}

// declare 关键字用来告诉编译器，某个类型是存在的，可以在当前文件中使用。
// 它的主要作用，就是让当前文件可以使用其他文件声明的类型。举例来说，自己的脚本使用外部库定义的函数，编译器会因为不知道外部函数的类型定义而报错，这时就可以在自己的脚本里面使用declare关键字，告诉编译器外部函数的类型。这样的话，编译单个脚本就不会因为使用了外部类型而报错。
// 只能定义，而不能有具体实现（例如你可以declare一个变量，一个方法，但你不可以在declare的同时对其赋值，或者定义的操作）
declare let __LOCALHOST__: string
