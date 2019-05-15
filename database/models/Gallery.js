const bookshelf = require('../bookshelf');

require('./User');
class Gallery extends bookshelf.Model{
  get tableName() { return 'gallery'; }
  get hasTimestamps() { return true; }

  // declares relationship to users
  user() {
    return this.belongsTo('User');
  }
}

module.exports = bookshelf.model('Gallery', Gallery);