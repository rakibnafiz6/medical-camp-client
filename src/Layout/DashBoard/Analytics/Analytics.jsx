import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, } from 'recharts';
import useAuth from '../../../hooks/useAuth';
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
  
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };


const Analytics = () => {
    const {user} = useAuth();

    const {data: registered} = useQuery({
        queryKey: ['analytics'],
        queryFn: async()=>{
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/analytics/${user?.email}`)
            return res.data;
        }
    })


    return (
    <div>
        <h2 className='font-bold text-center text-2xl mb-5'>Analytics</h2>
            <BarChart
        width={500}
        height={300}
        data={registered}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="campName" />
        <YAxis />
        <Bar dataKey="campFees" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
          {registered.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 6]} />
          ))}
        </Bar>
      </BarChart>
    </div>
    // <p>hello</p>
    );
};

export default Analytics;