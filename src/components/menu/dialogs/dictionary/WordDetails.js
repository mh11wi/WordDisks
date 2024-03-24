import { useEffect, useState, Fragment } from 'react';
import { TableCell } from '@mui/material';


async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 5000 } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal
  });
  clearTimeout(id);
  
  return response;
}

const WordDetails = ({ index, word, options, updateDefinitions }) => {
  const [details, setDetails] = useState(null);
  
  useEffect(() => {
    const fetchDefinition = async () => {
      try {
        const response = await fetchWithTimeout(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const json = await response.json();
        const detailsJsx = (
          <Fragment>
            <strong>({json[0].meanings[0].partOfSpeech})</strong> {json[0].meanings[0].definitions[0].definition}
          </Fragment>
        );
        setDetails(detailsJsx);
        updateDefinitions(word, detailsJsx);
      } catch (error) {
        setDetails('In word list, but a definition could not be loaded');
      }
    }
    
    if (options.inList) {
      if (options.definition) {
        setDetails(options.definition);
      } else {
        fetchDefinition();
      }
    } else {
      setDetails('Not in word list');
    }
  }, [word, options]);
  
  return (
    <Fragment>
      <TableCell>{index}</TableCell>
      <TableCell>{word}</TableCell>
      <TableCell>{details || 'In word list, loading definition...'}</TableCell>
    </Fragment>
  );
};

export default WordDetails;