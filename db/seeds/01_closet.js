
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('closet').del()
    .then(function () {
      // Inserts seed entries
      return knex('closet').insert([
        { id: 1, type: 'Dress', color: 'Pink', season: 0 },
        { id: 2, type: 'Sweater', color: 'White', season: 1 },
        { id: 3, type: 'Skirt', color: 'Purple', season: 2 },
      ]);
    });
};
