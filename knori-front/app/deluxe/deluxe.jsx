'use client';
import roomFilter from '../../components/data/room-filter';
import React, { useState } from 'react';
import RoomItem from './room-item';

const { projects, filters } = roomFilter;
const getFilteredProjects = (filterData) =>
  filterData === 'filter-item'
    ? projects
    : projects.filter((project) => project.filter.includes(filterData));

const Deluxe = () => {
  // Item Filter
  const [filter, setFilter] = useState('filter-item');
  const filteredProjects = getFilteredProjects(filter);
  // Item Active Hover
  const [active, setActive] = useState(1);
  const handelActive = (index) => {
    setActive(index);
  };
  return (
    <>
      <div className="deluxe__area section-padding">
        <div className="container">
          <div className="row align-items-end mb-30">
            <div className="col-xl-5">
              <div className="deluxe__area-title">
                <span className="subtitle__one">Deluxe and Luxury</span>
                <h2>Our Luxury Rooms</h2>
              </div>
            </div>
            <div className="col-xl-7">
              <div className="deluxe__area-btn">
                <ul>
                  {filters.map(({ id, name, filterData }) => (
                    <li
                      key={id}
                      onClick={() => setFilter(filterData)}
                      className={filter === filterData ? 'active' : ''}
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            {filteredProjects.map((project, index) => (
              <div
                className={project.class_s}
                key={project.id}
                onMouseEnter={() => handelActive(index)}
              >
                <div
                  className={`deluxe__area-item ${
                    active === index ? 'deluxe__area-item-hover' : ''
                  } ${project.filter.join(' ')}`}
                  key={index}
                >
                  <RoomItem project={project} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Deluxe;
