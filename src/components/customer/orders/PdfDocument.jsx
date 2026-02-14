import { Page, Document, pdfjs } from 'react-pdf';
import { useState, useRef, useEffect } from 'react'
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const MyDocument = (props) => {
    const [numPages, setNumPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)
    const containerRef = useRef(null)
    const [containerWidth, setContainerWidth] = useState(0)

    useEffect(() => {
        const updateWidth = () => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth);
        }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages)
    }
    console.log('pdf url: ',props.url)
    return(
        <div className='w-full max-h-full flex flex-col items-start justify-start'>
            <div className='w-full h-full overflow-auto'>
      <Document 
        file={props.url}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<div>Loading PDF...</div>}
        error={<div>Failed to load PDF</div>}
      >
        <Page 
          pageNumber={pageNumber}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
      </div>
      
      {numPages && (
        <div className="mt-2 py-3 flex gap-4 items-center w-full max-w-full justify-center">
          <button 
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(pageNumber - 1)}
            className="px-4 py-2 bg-blue-500 text-white text-sm md:text-base rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className='text-sm md:text-base'>
            Page {pageNumber} of {numPages}
          </span>
          <button 
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber(pageNumber + 1)}
            className="px-4 py-2 bg-blue-500 text-white text-sm md:text-base rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
    )
}

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#E4E4E4'
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1
//   }
// });

export default MyDocument