import Fetch from "./fetch";

const MessageService = {
    getPersonalAttention(){
        return Fetch('/user/attention/',{
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": localStorage.user.token
            },
        })
    }
}

export default MessageService;