import { Button } from "@nextui-org/react"
import { GoogleIcon } from "./GoogleIcon"
import { Footer } from "./Footer"
import { useUserStore } from "../shares/stores/useUserStore"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

export const LoginForm = () => {
    
  const { doingLogin, checkLogin } = useUserStore()
  const navigate = useNavigate()

  const handleClick = async () => {

    if (doingLogin){
      const data = await checkLogin()
      if (data){
        navigate("/")
        toast.success("Login exitoso!")
      }else{
        toast.error("Error al verificar login!")
      }
      return
    }

    chrome?.storage?.sync?.set({ doingLogin: true });
    window.localStorage.setItem("doingLogin", JSON.stringify(true) )
    
    window.open("http://localhost:5000/api/v1/login/google", "_blank")
  }

  return(
    <>  
        <div className=" text-center  flex flex-col gap-2  bg-default-100 items-center justify-center  mx-auto my-2 border border-default-200 rounded-xl w-full py-4 ">
          <div className=" flex gap-2 justify-center items-center">
          <h1 className="text-2xl font-bold">Passport Vault
          </h1>
          <img src="verify.png" className=" size-6" alt="icono verificado" />
          </div>

        </div>

        <div className="  my-2">
          <Button
            onClick={handleClick}
            color={
              doingLogin ? "primary" : "default"
            }
            className="w-full"
            variant={
              doingLogin ? "solid" : "faded"
            }
            
            startContent={
              doingLogin ? <></>: <GoogleIcon />
            }
          >
            {doingLogin ? "Verificar login!" : "Continuar con Google"}	
          </Button>
        </div>

        <Footer />
    </>
  )
}