import { validateEmail } from '../string-validator-functions'

const allowedEmails = [
    'nik@gmail.com',
    '213r443@abc.hgd',
    'sfknfsqwon1342_12414@outlook.com',
    '_@gg.gg',
    '$%@fhd.fskjnsfsd',
    'nik@h.hg'
]

allowedEmails.forEach(email => {
    test(`"${email}" is allowed`, () => {
        expect(email.match(validateEmail)).toBeTruthy()
    })
})

const disallowedEmails = [
    '@gmail.com',
    'G@ggg@gmail.com',
    'nik@hkda',
    'nik@nfsfsml.',
    'nik@h.h'
]

disallowedEmails.forEach(email => {
    test(`"${email}" is not allowed`, () => {
        expect(email.match(validateEmail)).toBeFalsy()
    })
})