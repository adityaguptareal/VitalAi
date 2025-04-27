import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import { toast } from 'react-hot-toast';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function UserDashboard() {
  const [healthRecords, setHealthRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({ date: '', description: '', value: '' });

  useEffect(() => {
    const fetchHealthRecords = async () => {
      const { data, error } = await supabase.from('health_records').select('*');
      if (error) {
        toast.error(`Error fetching health records: ${error.message}`);
      } else {
        setHealthRecords(data);
      }
    };
    fetchHealthRecords();
  }, []);

  const handleAddRecord = async () => {
    const { error } = await supabase.from('health_records').insert([newRecord]);
    if (error) {
      toast.error(`Error adding health record: ${error.message}`);
    } else {
      setHealthRecords([...healthRecords, newRecord]);
      setNewRecord({ date: '', description: '', value: '' });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <Tabs>
        <TabList>
          <Tab>Health Records</Tab>
          <Tab>Trends</Tab>
        </TabList>

        <TabPanel>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Add Health Record</h2>
            <input
              type="date"
              value={newRecord.date}
              onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
              className="border p-2 mb-2 w-full"
              placeholder="Date"
            />
            <input
              type="text"
              value={newRecord.description}
              onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
              className="border p-2 mb-2 w-full"
              placeholder="Description"
            />
            <input
              type="text"
              value={newRecord.value}
              onChange={(e) => setNewRecord({ ...newRecord, value: e.target.value })}
              className="border p-2 mb-2 w-full"
              placeholder="Value"
            />
            <button
              onClick={handleAddRecord}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add Record
            </button>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Health Records</h2>
            <ul>
              {healthRecords.map((record, index) => (
                <li key={index} className="border p-2 mb-2">
                  {record.date} - {record.description}: {record.value}
                </li>
              ))}
            </ul>
          </div>
        </TabPanel>

        <TabPanel>
          <h2 className="text-xl font-semibold">Health Data Trends</h2>
          <LineChart width={600} height={300} data={sampleData}>
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default UserDashboard;

// Sample data for the chart
const sampleData = [
  { date: '2023-01-01', value: 400 },
  { date: '2023-01-02', value: 300 },
  { date: '2023-01-03', value: 500 },
  { date: '2023-01-04', value: 200 },
];
