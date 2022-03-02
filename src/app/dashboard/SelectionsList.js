import { Grid } from "gridjs-react";
import UserList from "./UserList";

class SelectionsList extends UserList {
    constructor(props, context) {
      super(props, context);
      
      this.state = {
        selectedRows: []
      };
    }
    
    componentDidMount() {
       const grid = this.config.instance;
       
       grid.on('ready', () => {
         // find the plugin with the give plugin ID
         const checkboxPlugin = this.config.plugin.get('selectRow');
         
         // subscribe to the store events
         checkboxPlugin.props.store.on('updated', (state) => {
           this.setState({
             selectedRows: state.rowIds
           });
         });
      });
    }
    
    render() {
      if (!this.state.selectedRows.length) {
        return h('b', {}, 'Select some rows...');
      }
      
      return h(
        'ul', 
        {}, 
        this.state.selectedRows.map((rowId) => h('li', {}, rowId))
      );
    }
  }
    
  const grid = new Grid({
    columns: [
        {
          id: 'selectRow',
          name: 'Select',
          plugin: {
            component: RowSelection,
            props: {
              id: (row) => row.cell(2).data
            }
          }
        },
        { 
          name: 'Name',
          formatter: (cell) => `Name: ${cell}`
        },
        'Email',
    ],
    sort: true,
    data: Array(5).fill().map(x => [
      faker.name.findName(),
      faker.internet.email(),
    ])
  });
   
  grid.plugin.add({
    id: 'selectionsList',
    component: SelectionsList,
    position: PluginPosition.Footer,
  });