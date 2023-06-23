import CanvasJS from '@canvasjs/react-charts';
import {useRef} from "react";

export default function ShowTickets({tickets}) {
    const refChart = useRef(null)

    tickets = tickets.map((t) => ({
        y: +new Date(t.buy_timestamp*1000),
        x: t.ticket_num,
        user: t.user,
        type: t.ticket_type,
    }))
    const randomTickets = tickets.filter((t) => t.type === "random")
    const selectedTickets = tickets.filter((t) => t.type === "selected")


    const toggleDataSeries = (e) => {
        e.dataSeries.visible = !(e.dataSeries.visible === undefined || e.dataSeries.visible);
        refChart.current.render();
    }


    const options = {
        theme: "light2",
        animationEnabled: true,
        zoomEnabled: true,
        exportEnabled: true,
        // height: 1000,
        title: {
            text: "Tickets",
        },
        axisX: {
            title: "Tickets numbers",
            valueFormatString: "0000000",
        },
        axisY: {
            title: "Buy time",
            labelFormatter: (e) => new Date(e.value).toUTCString(),
        },
        legend: {
            cursor: "pointer",
            itemclick: toggleDataSeries,
        },
        toolTip: {
            contentFormatter: (e) => {
                const {x, y, user} = e.entries[0].dataPoint;
                const ticketFormatted = x.toString().padStart(7, '0')
                return `<span style="color:#4F81BC">Ticket number: #${ticketFormatted}</span><br>
                        Buy time: ${new Date(y).toUTCString()}<br>
                        User: ${user}`;
            },
        },
        data: [
            {
                type: "scatter",
                name: "Random Tickets",
                markerType: "cross",
                showInLegend: true,
                dataPoints: randomTickets
            },
            {
                type: "scatter",
                name: "Selected Tickets",
                showInLegend: true,
                markerType: "square",
                dataPoints: selectedTickets
            }]
    }

    return (
      <div>
          <CanvasJS.CanvasJSChart options={options} onRef={ref => refChart.current = ref}/>
      </div>
    );
}
