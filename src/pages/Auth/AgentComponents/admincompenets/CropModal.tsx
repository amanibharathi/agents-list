import React, { RefObject } from "react";
import CkAppModal from "./AppModal";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import AppButton from "../../../../AppComponents/AppButton-agent";

interface ICropModal {
  isOpen: boolean;
  onClose: () => void;
  imgRef: RefObject<HTMLImageElement>;
  imgSrc: string;
  onImageLoad: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  crop: Crop | undefined;
  setCrop: React.Dispatch<React.SetStateAction<Crop | undefined>>;
  setCompletedCrop: React.Dispatch<React.SetStateAction<PixelCrop | undefined>>;
  aspect: number | undefined;
  onDownloadCropClick: () => void;
  previewCanvasRef: React.RefObject<HTMLCanvasElement>;
  completedCrop: PixelCrop | undefined;
  isLoading?: boolean;
}

const CropModal = ({
  isOpen,
  onClose,
  imgRef,
  imgSrc,
  onImageLoad,
  crop,
  setCrop,
  setCompletedCrop,
  aspect,
  onDownloadCropClick,
  previewCanvasRef,
  completedCrop,
  isLoading,
}: ICropModal) => {
  return (
    <CkAppModal
      className="!w-full !max-w-[450px] mx-4"
      closeButton
      isOpen={isOpen}
      onClose={onClose}
      header="Crop"
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <div className="w-full lg:max-w-[500px] flex justify-center">
            {!!imgSrc && (
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspect}
                // minWidth={400}
                minHeight={100}
                // circularCrop
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc}
                  width={600}
                  height={200}
                  //   style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            )}
          </div>
        </div>

        <div className="flex flex-row md:flex-col gap-2 flex-1 justify-end">
          <AppButton
            isLoading={isLoading}
            onClick={onDownloadCropClick}
            className="md:w-full"
          >
            Save
          </AppButton>
          <AppButton
            onClick={() => onClose()}
            className="w-fit md:w-full !p-[6px_24px]"
            variant="outline"
          >
            Cancel
          </AppButton>
          <div>
            {/* <AppText text="Preview Image" /> */}
            <div className="flex justify-center items-center">
              <canvas
                className="w-full max-w-[205px]"
                ref={previewCanvasRef}
                style={{
                  border: "1px solid black",
                  objectFit: "contain",
                  width: completedCrop?.width,
                  height: completedCrop?.height,
                  display: "none",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </CkAppModal>
  );
};

export default CropModal;
