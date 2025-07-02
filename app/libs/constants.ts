import { v4 as uuidv4 } from 'uuid';
import { PasswordRecord } from "@/app/libs/types";

export const initialRecords: PasswordRecord[] = [
    {
        id: uuidv4(),
        label: 'Google',
        username: 'karthik29062000@gmail.com',
        password: 'RandomPassword123',
        url: 'https://google.com'
    },
    {
        id: uuidv4(),
        label: 'YouTube',
        username: 'karthik29062000@gmail.com',
        password: 'xyz',
        url: 'https://youtube.com'
    },
    {
        id: uuidv4(),
        label: 'Facebook',
        username: 'karthik29062000@gmail.com',
        password: 'Lorem ipsum',
        url: 'https://facebook.com'
    },
    {
        id: uuidv4(),
        label: 'Linkedin',
        username: 'karthik29062000@gmail.com',
        password: 'Lorem ipsum',
        url: 'https://linkedin.com'
    },
    {
        id: uuidv4(),
        label: 'Wrong',
        username: 'karthik29062000@gmail.com',
        password: 'Lorem ipsum',
        url: 'reger'
    }
];
