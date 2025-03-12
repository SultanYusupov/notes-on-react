import {useLoginMutation} from "../state/api/auth.api.ts";

export const useLogin = () => {
    const [loginMutation] = useLoginMutation();
    const login = async (email: string, password: string) => {
        const result = await loginMutation({email, password});
        if ('data' in result) return result.data;
        throw new Error('Ошибка при входе');
    };
    return login;
}