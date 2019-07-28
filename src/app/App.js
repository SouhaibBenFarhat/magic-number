import React from 'react';
import { Modal } from '@react95/core';
import { Tabs, Tab } from '@react95/core';
import { Alert } from '@react95/core';
import { Fieldset } from '@react95/core';
import magicNumberWorker from "./workers/MagicNumberWorker";
import WebWorker from "./config/WorkerSetup";
import Result from './components/Result';
import GeneralTab from './components/GeneralTab';
import LogsTab from './components/LogsTab';
import LogsFormatter from './logic/LogsFormatter';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      range: 60000,
      magicNumbers: [],
      result: [],
      showError: false,
      loading: false,
      logs: ''
    }
  }

  componentDidMount() {
    this.worker = new WebWorker(magicNumberWorker);
  }


  onRangeChange = (event) => {
    this.setState({ range: event.target.value })
  }

  onStartClick = () => {
    const { range } = this.state
    if (range <= 0) {
      this.setState({ showError: true })
      return
    } else {
      this.setState({ loading: true })
      this.triggerWorker();
    }
  }

  closeAlert = () => {
    this.setState({ showError: false })
  }

  triggerWorker = () => {
    this.worker.postMessage(this.state.range);
    this.worker.addEventListener("message", event => {
      const result = event.data[0];
      const magicNumbers = event.data[1];
      const loading = false;
      const error = false;
      const logs = new LogsFormatter(result).formatInput()
      this.setState({ result, magicNumbers, loading, error, logs })
    });
  }


  render() {
    const { showError, magicNumbers, logs, loading, range } = this.state;
    return (
      <div>
        <Modal
          height={700}
          width={500}
          icon="computer"
          title="Magic number finder"
          buttons={[{ value: 'Click to start', onClick: this.onStartClick }]}>
          <div>
            <Tabs activeTab="Setup">
              <Tab title="Setup">
                <GeneralTab onRangeChange={this.onRangeChange} range={range} />
              </Tab>
              <Tab title="Logs">
                <LogsTab logs={logs} />
              </Tab>
            </Tabs>
          </div>
          <div style={{ marginTop: 20, maxHeight: 470, overflowY: 'scroll' }}>
            <Fieldset legend="Result">
              <Result magicNumbers={magicNumbers} loading={loading} />
            </Fieldset>
          </div>
        </Modal>

        {showError && <Alert
          title="Range error"
          type="error"
          message="The number entered should be greater than 0"
          closeAlert={this.closeAlert}
        />}
      </div>
    );
  }
}

