
let userInfo = {full_name: "Oleg", phone_number: "", city: "Kiev", department: "", email: "", comment: ""}
let parametrs = []
let querySet = ['SET ']

for (const [key, value] of Object.entries(userInfo)) {
  if (value) {
    parametrs.push(key)
    querySet.push(`${key} = ?`)
  }
} 

let sqlRun = `(
        UPDATE orders 
        ${querySet.join(", ")}
        WHERE order_id = ?
), ${parametrs}`
console.log(sqlRun);

