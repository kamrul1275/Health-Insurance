const Branch = require('./Branch');
const Member = require('./Member');

// Define relationships
Branch.hasMany(Member, { foreignKey: 'branch_id' });
Member.belongsTo(Branch, { foreignKey: 'branch_id' });

module.exports = { Branch, Member };