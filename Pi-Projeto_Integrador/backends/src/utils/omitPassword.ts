import { User } from "../models/Usuario"

export function omitPassword(user:User){
   
    const {senha, ...rest} = user
    return rest
}

