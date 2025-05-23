export default interface UpdateForgotPassword{
    email:string,
    token:string,
    newPassword:string,
    confirmNewPassword:string
}