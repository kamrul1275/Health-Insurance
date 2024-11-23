const Branch = require('./Branch');
const Member = require('./Member');
const Category = require('./Category');
const Policy = require('./Policy');

// Define relationships
Branch.hasMany(Member, { foreignKey: 'branch_id' });
Member.belongsTo(Branch, { foreignKey: 'branch_id' });




// Define relationships
Policy.hasMany(Category, { foreignKey: 'policy_id' });
Category.belongsTo(Policy, { foreignKey: 'policy_id' });



module.exports = { Branch, Member, Category, Policy };