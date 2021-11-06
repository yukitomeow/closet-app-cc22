
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('closet').del()
    .then(function () {
      // Inserts seed entries
      return knex('closet').insert([
        { id: 1, type: 'Dress', color: 'Pink', season: "Spring" },
        { id: 2, type: 'Sweater', color: 'White', season: "Fall" },
        { id: 3, type: 'Skirt', color: 'Purple', season: "Summer" },
      ]);
    });
};
