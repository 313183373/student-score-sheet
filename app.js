const readLineSync=require('readline-sync');

const main_menu=['添加学生','生成成绩单'];

class Student{
    constructor(name,id,nation,klass,scores){
        this.name=name;
        this.id=id;
        this.nation=nation;
        this.klass=klass;
        scores.forEach((value,index,arr)=>{
            let [course,score]=value.split(':');
            score=Number(score);
            if(course==='语文'){
                this.chinese=score;
            }else if(course==='数学'){
                this.math=score;
            }else if(course==='英语'){
                this.english=score;
            }else if(course==='编程'){
                this.program=score;
            }
        })
        this.total=this.chinese+this.math+this.english+this.program;
        this.average=(this.total/4).toFixed(2);
    }

    printScore(){
        return `${this.name}|${this.math}|${this.chinese}|${this.english}|${this.program}|${this.average}|${this.total}`;
    }
}

let student_arr=[];
while(true){
    let index=readLineSync.keyInSelect(main_menu,'请输入你的选择');
    switch(index){
        case 0:{
            addStudent();
            break;
        }
        case 1:{
            selectScores();
            break;
        }
        case -1:{
            return;
        }
    }
}

function addStudent(){
    let student_info=readLineSync.question('请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：')
    let [name,id,nation,klass,...scores]=student_info.split(',');
    if(check_info(student_info)){
        student_arr.push(new Student(name,id,nation,klass,scores));
        console.log(`学生${name}的成绩被添加!`);
    }else{
        do{
            student_info=readLineSync.question('请按正确的格式输入（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：')
        }while(!check_info(student_info));
        let [name,id,nation,klass,...scores]=student_info.split(',');
        student_arr.push(new Student(name,id,nation,klass,scores));                
        console.log(`学生${name}的成绩被添加!`);
    }
}

function selectScores(){
    let ids=readLineSync.question('请输入要打印的学生的学号（格式： 学号, 学号,...），直接回车表示所有学术信息，按回车提交：').split(',');
    if(check_id(ids)){
        showScores(ids);
    }else{
        do{
            ids=readLineSync.question('请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），直接回车表示所有学术信息，按回车提交：').split(',');
        }while(!check_id(ids));
        showScores(ids);
    }
}

function showScores(ids){
    let result=['成绩单','姓名|数学|语文|英语|编程|平均分|总分','========================'];
    student_arr.forEach((value,index,arr)=>{//这里遍历的是学生数组，所以就算ids里面有重复的也没事
        if(ids.includes('')||ids.includes(value.id)){
            result.push(value.printScore());
        }
    });
    let total_score=student_arr.reduce((pre,now,arr)=>pre+now.total,0);
    let middle_score;
    student_arr.sort((a,b)=>a.total-b.total);
    if(student_arr.length&1){
        middle_score=student_arr[Math.floor(student_arr.length/2)].total;
    }else{
        middle_score=(student_arr[student_arr.length/2].total+student_arr[student_arr.length/2-1].total)/2;
    }
    result.push('========================',`全班总分平均数:${(total_score/student_arr.length).toFixed(2)}`,`全班总分中位数:${(middle_score).toFixed(2)}`);
    console.log(result.join('\n'));
}

function check_id(ids){
    return ids.every((value,index,arr)=>{
        return (/^\d{4}$/.test(value))||ids.includes('');
    });
}

// 这里暂时先不检查格式，不太好检查
function check_info(info){
    let length=info.split(',').length;
    return length===8;
}



const testReg=/^[\u4e00-\u9fa5],\d{4},[\u4e00-\u9fa5],[\u4e00-\u9fa5],[\u4e00-\u9fa5],[\u4e00-\u9fa5],[\u4e00-\u9fa5],[\u4e00-\u9fa5]$/;
