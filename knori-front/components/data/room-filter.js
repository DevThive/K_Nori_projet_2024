const roomFilter = {
  filters: [
    {
      id: 1,
      name: 'All Room',
      filterData: 'filter-item',
    },
    {
      id: 2,
      name: 'Luxury',
      filterData: 'luxury',
    },
    {
      id: 3,
      name: 'Single',
      filterData: 'single',
    },
    {
      id: 4,
      name: 'Small Suite',
      filterData: 'suite',
    },
    {
      id: 5,
      name: 'Family',
      filterData: 'family',
    },
  ],
  projects: [
    {
      id: 1,
      image: '/img/luxury/luxury-1.jpg',
      title: 'Small Suite',
      price: '134',
      class_s: 'col-xl-3 col-lg-4 mt-30',
      filter: ['suite'],
    },
    {
      id: 2,
      image: '/img/luxury/luxury-2.jpg',
      title: 'Deluxe Room',
      price: '199',
      class_s: 'col-xl-6 col-lg-8 mt-30',
      filter: ['suite'],
    },
    {
      id: 3,
      image: '/img/luxury/luxury-3.jpg',
      title: 'Family Room',
      price: '319',
      class_s: 'col-xl-3 col-lg-4 mt-30',
      filter: ['family'],
    },
    {
      id: 4,
      image: '/img/luxury/luxury-4.jpg',
      title: 'Single Room',
      price: '169',
      class_s: 'col-xl-6 col-lg-8 mt-30',
      filter: ['single'],
    },
    {
      id: 5,
      image: '/img/luxury/luxury-5.jpg',
      title: 'Luxury Room',
      price: '249',
      class_s: 'col-xl-6 mt-30',
      filter: ['luxury'],
    },
  ],
};

export default roomFilter;
