import React from 'react'
import { LineGraphItem } from 'src/types/common/graph'
import { ResponsiveLine } from '@nivo/line'
import './scss/LineGraph.scss'

type Props = {
  lines: Array<LineGraphItem>
  emptyText?: string
}

const LineGraph: React.FC<Props> = (props) => {
  return (
    <div className="line-graph">
      {props.lines.length ? (
        <ResponsiveLine
          animate={true}
          data={props.lines}
          margin={{ top: 80, right: 110, bottom: 50, left: 100 }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
          }}
          yFormat=","
          axisBottom={{
            orient: 'right',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '年',
            legendOffset: 36,
            legendPosition: 'middle',
          }}
          axisLeft={{
            orient: 'top',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '人口',
            legendOffset: -80,
            legendPosition: 'middle',
            format: (value) => Number(value).toLocaleString(),
          }}
          pointSize={8}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          useMesh={true}
          colors={{ scheme: 'category10' }}
          tooltip={({ point }) => {
            return (
              <div
                style={{
                  background: 'white',
                  padding: '8px 12px',
                  border: '1px solid #ccc',
                  textAlign: 'right',
                  fontSize: '12px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    style={{
                      height: '10px',
                      width: '10px',
                      backgroundColor: point.serieColor,
                    }}
                  ></div>
                  <div
                    style={{
                      fontWeight: 700,
                    }}
                  >
                    {point.serieId}
                  </div>
                </div>
                <div>{point.data.x}年</div>
                <div>{Number(point.data.y).toLocaleString()}人</div>
              </div>
            )
          }}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      ) : (
        props.emptyText && (
          <div className="line-graph__empty">{props.emptyText}</div>
        )
      )}
    </div>
  )
}

export default LineGraph
