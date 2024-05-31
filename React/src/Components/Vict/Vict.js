import React from 'react';
import {useState, useEffect} from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { api } from '../../Api';
import ReactDOM from 'react-dom';
import { data } from 'autoprefixer';
import { VictoryBar, VictoryChart, VictoryAxis,
    VictoryTheme,VictoryLabel,VictoryTooltip,VictorySelectionContainer} from 'victory';



const Vict = () => {
    const [error,setError] = useState(null)
    const [project,setProject] = useState([])
    const[stinttech,setStinttech] = useState([])
    const [chartdata,setChartData]=useState([])
    const [projectid,setProjectid]=useState()
    const [chartflag,setChartFlag]=useState(false)


    useEffect(() => {
        api.project.list().then((response) => {
        setError(null)
        setProject(response.data);
        }).catch((error) => {
        const {message} = error.response.data
        setError(message)
        })
        },[])

    useEffect(() => {
            api.stinttech.list().then((response) => {
            setError(null)
            console.log(response.data)
            setStinttech(response.data);
            }).catch((error) => {
            const {message} = error.response.data
            setError(message)
            })
            },[])
        


    useEffect(() => {
        const chart=[]
        for(let i=0;i<project.length;i++) {
            let track= {
                x:project[i].name,
                y:project[i].completion_date,
                y0:project[i].start_date,
                id:project[i].id,
                label:[project[i].name,project[i].description,project[i].start_date,project[i].completion_date]
            }
            chart.push(track)
        }
        setChartData(chart)
    },[project])
    return(
        <div class="pt-3 pl-4">
        <VictoryChart height={350} width={800}
        // containerComponent={<VictorySelectionContainer/>}
        theme={VictoryTheme.material} 
        domainPadding={20} 
         scale={{ y: "time" }}
        padding={{ top: 50, bottom: 150, left: 130, right: 80 }}>
        
        <VictoryAxis>

        </VictoryAxis>
    
        <VictoryAxis fixLabelOverlap={true}
          dependentAxis
          tickFormat={(x) => {
            const d = new Date(x)
            const year=  d.getFullYear()
            const month= d.toLocaleString('en-us', { month: 'short' });
            return`${month}/${year}`;}} 
        />

        <VictoryBar horizontal
        barWidth={5}
        barRatio={10}
        style={{
            data: { 
                fill: "#c43a31", stroke: "black", strokeWidth: 0.7 }
            }}
        labelComponent={<VictoryTooltip
            center={{x:425, y:20}}
            flyoutWidth={70}
            flyoutStyle={{ stroke: "orange", strokeWidth: 2 }}
        
        />}            
         events={[{
                target: "data",
                eventHandlers: {
                  onMouseOver: () => {
                    return [
                      {
                        target: "data",
                        mutation: () => ({style: {fill: "gold", width: 30}})
                      }, {
                        target: "labels",
                        mutation: () => ({ active: true })
                      }
                    ];
                  },
                  onMouseOut: () => {
                    return [
                      {
                        target: "data",
                        mutation: () => {}
                      }, {
                        target: "labels",
                        mutation: () => ({ active: false })
                      }
                    ];
                  },
                 onClick: () => {
                    return [
                        {
                            target:"data",
                            mutation:(props) => {
                                setChartFlag(true);
                                setProjectid(props.datum.id)
                                return null
                                
                            }
                            
                        }
                    ]
                 } 
                }
              }]}
        data={chartdata}        
        x="x"
        y="y"
      />
      </VictoryChart>

        <div>
              {chartflag === true ? 
                <table class="table text-center table-bordered table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Description</th>                
                      <th scope="col">Start Date</th>
                      <th scope="col">Completion Date</th>
                      <th scope="col">Client Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.map((obj) => {
                      return (
                        obj.id === projectid ?
                          <tr>
                            <td>{obj.name}</td>
                            <td>{obj.description}</td> 
                            <td>{obj.start_date}</td>
                            <td>{obj.completion_date}</td>
                            <td>{obj.client.name}</td>
                          </tr>
                        : null
                      )
                    })}
                  </tbody>
                </table>
                : null
              }


                {chartflag === true ? 
                
                <table class="table text-center table-bordered table-hover">
                    
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Employee Name</th>
                      <th scope="col">Employee Contribution</th>                
                      <th scope="col">Employee Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stinttech.map((obj) => {
                      return (
                        obj.stint.project.id === projectid ?
                          <tr>
                            <td>{obj.stint.employee.first_name}</td>
                            <td>{obj.stint.contribution}</td> 
                            <td>{obj.stint.role}</td>
                          </tr>
                        : null
                      )
                    })}
                  </tbody>
                </table>
                : null
              }


            {chartflag === true ? 
                <table class="table text-center table-bordered table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Technology Used</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stinttech.map((obj) => {
                      return (
                        obj.stint.project.id === projectid ?
                          <tr>
                            <td>{obj.technology.name}</td>
                          </tr>
                        : null
                      )
                    })}
                  </tbody>
                </table>
                : null
              }
        </div>
    </div>
    )
}

export default Vict;