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
    },

    attentionDel(filename){
        return Fetch('/user/attention/',{
            methods: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": localStorage.user.token
            },
            body: JSON.stringify({
                "fileName": filename
            })
        })
    }
}

export default MessageService;