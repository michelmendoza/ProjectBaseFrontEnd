import { useEffect,useRef,useState,FormEvent } from 'react'
import { FiTrash } from 'react-icons/fi'
import  { api } from '../src/services/api'
 

interface CustomerProps{
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
  updated_at: string;
}



export default function App(){

  const [customers, setCustomers] = useState<CustomerProps[]>([])
  const nameREF=useRef<HTMLInputElement | null>(null)
  const emailREF=useRef<HTMLInputElement | null>(null)
  const phoneREF=useRef<HTMLInputElement | null>(null)



  useEffect(() =>{
    loadCustomers();
  },[])

  async function loadCustomers(){
    const response = await api.get("/customer")
    setCustomers(response.data)
  }

 async function handleSubmit(event:FormEvent){
  event.preventDefault();

  if(!nameREF.current?.value || !emailREF.current?.value || !phoneREF.current?.value) return;
  
const response = await api.post("/customer", {
  name: nameREF.current?.value ,
  email: emailREF.current?.value ,
  phone: phoneREF.current?.value

})


 setCustomers(allCustomers => [...allCustomers, response.data])
 nameREF.current.value = ""
 emailREF.current.value = ""
 phoneREF.current.value = ""

}

 async function handleDelete(id: string) {
  try {
    await api.delete("/customer", {
      params: {
        id : id
      }
      
    })

    const allCustomers = customers.filter((customer) => 
    customer.id !== id   )

    setCustomers(allCustomers)

  } catch (err) {
    console.log(err)
  }

 

}

  return(
    <div className="w-full min-h-screen bg-red-500 flex justify-center px-4" >
      <main className="my-10 w-full bg-yellow-100 md:max-w-2xl" >
      <h1 className="text-5xl font-bold text-red-500 flex justify-center">NOAR - Clientes</h1>
     
      <form className="flex flex-col my-6 px-4" onSubmit={handleSubmit} >
      <label className="font-medium text-red-500">Nome:</label>
      <input
        type="text"
        placeholder="Digite seu nome completo..."
        className="w-full mb-5 p-2 rounded"
        ref={nameREF}
        ></input>

      <label className="font-medium text-red-500">Email:</label>
      <input
        type="email"
        placeholder="Digite seu email..."
        className="w-full mb-5 p-2 rounded"
        ref={emailREF} 
        ></input>

      <label className="font-medium text-red-500">Phone:</label>
      <input
        type="text"
        placeholder="Digite seu Telefone..."
        className="w-full mb-5 p-2 rounded"
        ref={phoneREF}
        ></input>

        <input
        type="submit"
        value="Cadastrar"
        className="cursor-pointer w-full p-2 bg-green-700 rounded font-medium"
        ></input>
      </form>
     
    <section className="flex flex-col px-4 gap-4">
      {customers.map((customer) => (
           
      
      <article 
      key={customer.id}
      className="w-full bg-yellow-50 rounded p-2 relative hover:scale-110 duration-300">
    
      <p><span>Nome:</span> {customer.name} </p>
      <p><span>Email:</span> {customer.email} </p>
      <p><span>Phone:</span> {customer.phone ? customer.phone : "Não Cadastrado"  } </p> 
      <p><span>Status:</span> {customer.status ? "ATIVO" : "INATIVO"}</p>
      <button className="bg-red-500 w-7 h-7 flex 
      items-center justify-center rounded-lg absolute right-0 -top-2"
      onClick={ () => handleDelete(customer.id)}
      >
      <FiTrash size={18} color="#FFF"></FiTrash>

      </button>

      </article>
      ))}
    </section>
     



      </main>
    </div>
  )

}