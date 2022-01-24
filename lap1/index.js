const fs = require("fs");

const [, , command, arg,arg_value] = process.argv;

const text = fs.readFileSync("./database.json", "utf-8");

const parsedText = JSON.parse(text);


switch (command) {
    
    case "show":
        console.log(parsedText);
        break;
    case "add":
        parsedText.push({
         
            id: parsedText[parsedText.length - 1].id + 1,
            value: arg
        })
        break;

    case "delete":
        const  delete_id=parseInt(arg);
        const index =parsedText.findIndex(item=>delete_id===item.id) ;
      ///  console.log(index);
        parsedText.splice(index,1)
        break;

    case "find":
              let new_id=parseInt(arg);
             parsedText.find(item=>{
                   if(new_id===item.id)
                    console.log(item.value);
    
             });
               


// let new_id=parseInt(arg);
// consol.log(arg);
// for(var i=0;i<parsedText.length-1;i++ )
// {
//   if(parsedText[i].id==new_id)
//  {
//     consol.log(typeof parsedText[i].id);
//     consol.log(new_id);
//     consol.log(parsedText[i].value);
//  }
// }
        break;

    case "edit": 
    let edit_id=parseInt(arg);
    parsedText.find(item=>{
          if(edit_id===item.id)
           {
            item.value=arg_value;
           }
    });
      
        break;

}

fs.writeFileSync("./database.json", JSON.stringify(parsedText))

