const db = require('../models');

const getRolesAccount = async (account: any) => {
    try {
        const data = await db.Group_account.findOne({
            include: [{model: db.Role}],
            where: {id: account.GroupAccountId}
        })

        if(data) {
            return data;
        } else {
            return {};
        }
    } catch (error) {
        console.log("error", error)
    }
}

module.exports = {
    getRolesAccount
}