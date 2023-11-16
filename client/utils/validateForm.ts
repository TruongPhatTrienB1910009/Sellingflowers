export const validateForm = (data: any) => {
    const emailRegex = /^\S+@\S+\.\S+$/
    let error: any = {};

    if (!data.email) {
        error.email = 'Email không được để trống';
    } else if (!emailRegex.test(data.email)) {
        error.email = 'Email sai định dạng'
    }

    if (!data.password) {
        error.password = 'Mật khẩu không được để trống';
    }

    return error;

}