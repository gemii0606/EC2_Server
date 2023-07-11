const express = require('express');
const router = express.Router();
const User = require('../utils/model/users');
const Friendship = require('../utils/model/friendships');

// take out the function
const { checkAuthorization } = require('../utils/function');


router.post('/', checkAuthorization, async (req, res) => {
    const decodedToken = req.decodedToken;
    const to_id = decodedToken.id;  // see if you are receiver
    const friendships_info = await Friendship.findAll({
        where: { to_id, status: 'pending' },
        attributes: ['id', 'from_id', 'to_id'],
        include: [
            {
                model: User,
                attributes: ['id', 'name', 'email', 'picture'],
                as: 'FromUser'
            }
        ]
      });
    
    const result = friendships_info.map(friend =>{
        const user_info = friend.dataValues.FromUser.dataValues;
        return user_info;
    });
    
    console.log(result)
    // console.log(friendships_info[0].dataValues);
    // console.log(friendships_info[1].dataValues);


    
    return res.status(200).json({ok: 'ok'});

});

module.exports = router;