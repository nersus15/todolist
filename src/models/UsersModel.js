const { nanoid } = require("nanoid");
const InvariantError = require("../Exceptions/InvariantError");
const bcrypt = require('bcrypt');

const NewUser = async (paylod) => {
    const uid = `user-${nanoid(16)}`;
    if(!paylod.password || !paylod.username || !paylod.nama){
        throw new InvariantError('password, username, nama is required');
    }
    const password = await bcrypt.hash(paylod.password, 10);

    return {id: uid, ...paylod, password}
}

module.exports = {NewUser}