let obj1 = {
    name: 'Maxim',
    age: 24,
    someArray: [
        1,
        2,
        3,
        4,
        5
    ],
    isObj: true,
    someObj: {
        testObj: true
    },
    someDate: new Date(),
    someMap: new Map([[1, 2], [3, 4]]),
    someSet: new Set([1, 2, 3]),
    someFunction: (value) => {
        let valueForFunction = value;
        return true;
    },
    someSymbol: Symbol("testSymbol")
};
let protoObj = {
    isProto: true
};
obj1.__proto__ = protoObj;
const testIsCopy = (originalObject, copyObject) => {
    originalObject === copyObject ? console.error('Test is copy Failed!') : console.log('Test is copy Complete!');
    return originalObject === copyObject ? false : true;
};
const testIndependenceOfObjects = (originalObject, copyObject) => {
    let valueForCheck = originalObject.name;
    delete originalObject.name;
    copyObject.name ? console.log('Test on independence Complete!') : console.error('Test on independence Failed!');
    originalObject.name = valueForCheck;
    return copyObject.name ? true : false;
};
const testOnProto = (originalObject, copyObject) => {
    originalObject.isProto && copyObject.isProto ? console.log('Test on prototype Complete!') : console.error('Test on prototype Failed!');
    return originalObject.isProto && copyObject.isProto ? true : false;
};
const testOnArray = (originalObject, copyObject) => {
    const checkArrayLength = originalObject.someArray.length === copyObject.someArray.length ? true : false;
    const valueArray = originalObject.someArray[0];
    originalObject.someArray.splice(0, 1);
    const checkArrayValue = originalObject.someArray !== copyObject.someArray ? true : false;
    originalObject.someArray.unshift(valueArray);
    checkArrayLength && checkArrayValue ? console.log('Test on array Complete!') : console.error('Test on array Failed!');
    return checkArrayLength && checkArrayValue ? true : false;
};
const testOnObj = (originalObject, copyObject) => {
    originalObject.someObj.testObj = false;
    originalObject.someObj.testObj !== copyObject.someObj.testObj ? console.log('Test on object Complete!') : console.error('Test on object Failed!');
    originalObject.someObj.testObj = true;
    return originalObject.someObj.testObj === copyObject.someObj.testObj ? true : false;
};
const testOnType = (copyObject) => {
    typeof copyObject.name === 'string' &&
        typeof copyObject.age === 'number' &&
        typeof copyObject.isObj === 'boolean' &&
        Array.isArray(copyObject.someArray) &&
        typeof copyObject.someObj === 'object' &&
        copyObject.someDate instanceof Date &&
        copyObject.someMap instanceof Map &&
        copyObject.someSet instanceof Set ?
        console.log('Test on type Complete!') :
        console.error('Test on type Failed!');
    return typeof copyObject.name === 'string' &&
        typeof copyObject.age === 'number' &&
        typeof copyObject.isObj === 'boolean' &&
        Array.isArray(copyObject.someArray) &&
        typeof copyObject.someObj === 'object' &&
        copyObject.someDate instanceof Date &&
        copyObject.someMap instanceof Map &&
        copyObject.someSet instanceof Set ?
        true :
        false;
};
const testOnFunction = (copyObject) => {
    let testValue = copyObject.someFunction(5);
    testValue ? console.log('Test on function Complete!') : console.error('Test on function Failed!');
    return testValue ? true : false;
};
const testOnSymbol = (copyObject) => {
    typeof copyObject.someSymbol === 'symbol' ? console.log('Test on symbol Complete!') : console.error('Test on symbol Failed!');
    return typeof copyObject.someSymbol === 'symbol' ? true : false;
};
const isCopyObj = (objectForCopy) => {
    const functionForCopy = objectForCopy.someFunction;
    delete objectForCopy.someFunction;
    const symbolForCopy = objectForCopy.someSymbol;
    delete objectForCopy.someSymbol;
    let copyOfObject = structuredClone(objectForCopy);
    objectForCopy.someFunction = functionForCopy;
    copyOfObject.someFunction = functionForCopy;
    objectForCopy.someSymbol = symbolForCopy;
    copyOfObject.someSymbol = symbolForCopy;
    copyOfObject.__proto__ = objectForCopy.__proto__;
    testIsCopy(objectForCopy, copyOfObject);
    testIndependenceOfObjects(objectForCopy, copyOfObject);
    testOnProto(objectForCopy, copyOfObject);
    testOnArray(objectForCopy, copyOfObject);
    testOnObj(objectForCopy, copyOfObject);
    testOnType(copyOfObject);
    testOnFunction(copyOfObject);
    testOnSymbol(copyOfObject);
    let testText = document.getElementById('test-text');
    if (testIsCopy(objectForCopy, copyOfObject) &&
        testIndependenceOfObjects(objectForCopy, copyOfObject) &&
        testOnProto(objectForCopy, copyOfObject) &&
        testOnArray(objectForCopy, copyOfObject) &&
        testOnObj(objectForCopy, copyOfObject) &&
        testOnType(copyOfObject) &&
        testOnFunction(copyOfObject) &&
        testOnSymbol(copyOfObject)) {
        testText.innerHTML = `Тесты прошли успешно!`;
        testText?.classList.add('complete');
    }
    else {
        testText.innerHTML = `Тесты прошли с ошибками!`;
        testText?.classList.add('error');
    }
};
isCopyObj(obj1);
