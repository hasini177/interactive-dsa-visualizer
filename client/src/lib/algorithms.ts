// Simulation Logic for Algorithms

export type StepType = 'info' | 'swap' | 'compare' | 'found' | 'not-found' | 'done';

export interface LogStep {
  type: StepType;
  message: string;
  arrayState?: number[]; // State of the array AFTER this step
  highlightIndices?: number[]; // Indices involved in this step
}

export const C_PLUS_PLUS_CODE = {
  bubbleSort: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap arr[j] and arr[j + 1]
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                
                printArray(arr, n); // Visualizer Output
            }
        }
    }
}`,
  selectionSort: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }
        
        // Swap the found minimum element with the first element
        if(min_idx != i) {
            int temp = arr[min_idx];
            arr[min_idx] = arr[i];
            arr[i] = temp;
            
            printArray(arr, n); // Visualizer Output
        }
    }
}`,
  linearSearch: `int linearSearch(int arr[], int n, int x) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == x) {
            cout << "Found at index " << i << endl;
            return i;
        }
    }
    cout << "Not found" << endl;
    return -1;
}`
};

export const simulateBubbleSort = (initialArr: number[]): LogStep[] => {
  const logs: LogStep[] = [];
  const arr = [...initialArr];
  const n = arr.length;

  logs.push({ type: 'info', message: 'Starting Bubble Sort...', arrayState: [...arr] });

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      logs.push({ 
        type: 'compare', 
        message: `Comparing arr[${j}] (${arr[j]}) and arr[${j+1}] (${arr[j+1]})`, 
        arrayState: [...arr],
        highlightIndices: [j, j+1]
      });

      if (arr[j] > arr[j + 1]) {
        // Swap
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        logs.push({ 
          type: 'swap', 
          message: `Swapped arr[${j}] and arr[${j+1}]. Array: [${arr.join(', ')}]`, 
          arrayState: [...arr],
          highlightIndices: [j, j+1]
        });
      }
    }
  }

  logs.push({ type: 'done', message: 'Bubble Sort Complete.', arrayState: [...arr] });
  return logs;
};

export const simulateSelectionSort = (initialArr: number[]): LogStep[] => {
  const logs: LogStep[] = [];
  const arr = [...initialArr];
  const n = arr.length;

  logs.push({ type: 'info', message: 'Starting Selection Sort...', arrayState: [...arr] });

  for (let i = 0; i < n - 1; i++) {
    let min_idx = i;
    logs.push({ type: 'info', message: `Finding minimum starting from index ${i}`, arrayState: [...arr], highlightIndices: [i] });

    for (let j = i + 1; j < n; j++) {
      logs.push({ 
        type: 'compare', 
        message: `Check if arr[${j}] (${arr[j]}) < current min (${arr[min_idx]})`, 
        arrayState: [...arr],
        highlightIndices: [j, min_idx]
      });

      if (arr[j] < arr[min_idx]) {
        min_idx = j;
        logs.push({ 
            type: 'info', 
            message: `New minimum found at index ${min_idx} (${arr[min_idx]})`, 
            arrayState: [...arr],
            highlightIndices: [min_idx]
          });
      }
    }

    if (min_idx !== i) {
      const temp = arr[min_idx];
      arr[min_idx] = arr[i];
      arr[i] = temp;

      logs.push({ 
        type: 'swap', 
        message: `Swapped minimum (${arr[i]}) with arr[${i}]. Array: [${arr.join(', ')}]`, 
        arrayState: [...arr],
        highlightIndices: [i, min_idx]
      });
    }
  }

  logs.push({ type: 'done', message: 'Selection Sort Complete.', arrayState: [...arr] });
  return logs;
};

export const simulateLinearSearch = (initialArr: number[], target: number): LogStep[] => {
  const logs: LogStep[] = [];
  const arr = [...initialArr];
  
  logs.push({ type: 'info', message: `Starting Linear Search for ${target}...`, arrayState: [...arr] });

  for (let i = 0; i < arr.length; i++) {
    logs.push({ 
      type: 'compare', 
      message: `Checking index ${i}: Is ${arr[i]} == ${target}?`, 
      arrayState: [...arr],
      highlightIndices: [i]
    });

    if (arr[i] === target) {
      logs.push({ type: 'found', message: `Found ${target} at index ${i}!`, arrayState: [...arr], highlightIndices: [i] });
      return logs;
    }
  }

  logs.push({ type: 'not-found', message: `${target} not found in array.`, arrayState: [...arr] });
  return logs;
};
